---
title: Creating animated thumbnails with ffmpeg in Go!
author: Janne Jensen
category: [words]
published: true
tags:
  - golang
meta:
  updatedAt: 2023-01-03T16:55:00+0100
  createdAt: 2023-03-09T11:28:47+0100
---

Let's start with a little bit of context: When our local community center had to cancel in-person events at the height of the pandemic, we began to pursue live streaming and decided to commit to better documentation of past events. We did the <del>un</del>reasonable thing and decided to develop our own media archive und streaming platform for a number of reasons: (a) due to data privacy concerns with uploading all of our content to major platforms, (b) because available self-hostable solutions were slow and had bad UI/UX and (c) for the mere fun and experience that comes with DIY.

While I began writing [the user and admin facing side of the project](https://codeberg.org/mediathek/media-ui), my colleague elegantly stitched together the necessary PostgreSQL database and OvenMediaEngine (OME) server [for the backend](https://codeberg.org/mediathek/media-server). After quite a bit of tweaking and polishing, we had a working prototype that enabled us to schedule upcoming live streams prior to the event using the the admin dashboard. When on site, we simply fired up OBS and went live within a second or less, thanks to the WebRTC and HLS protocols provided by OME.

## Animated thumbnails

On the side, we began to experiment with `ffmpeg` to generate animated thumbnails for the uploaded videos. The instructions were fairly simply:

1. Prope the video a couple of times and return a list of time stamps
2. Cut a short segment from the video at each time stamps
3. Concatenate the segments and save as WebP file

The approach might be a bit naive, but it worked fairly well.

```shell
$ ffprobe -i 'video_file.mp4' -v error -select_streams v:0 \n
-show_entries stream=duration -of default=noprint_wrappers=1:nokey=1
```

The corresponding Go wrapper would then look as follows:

```go
var file string = os.Args[1]

// timeStamps returns four timeStamps at 20, 40, 60 and 80% of a given
// video file as a slice of time.Duration
func timeStamps(file string) []time.Duration {
	var stampAt = [4]float64{0.2, 0.4, 0.6, 0.8}
	var timeStamps []time.Duration

	args := []string{"-i", file, "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=duration", "-of", "default=noprint_wrappers=1:nokey=1"}
	out, err := exec.Command("ffprobe", args...).Output()
	if err != nil {
		log.Fatal(err)
	}

	s := string(out)
	s = strings.TrimRight(s, "\n")
	f, _ := strconv.ParseFloat(s, 32)

	for _, v := range stampAt {
		timeStamps = append(timeStamps, time.Duration(f*v)*time.Second)
	}
	return timeStamps
}
```

Next we take those timestamps and cut the provided video file into segments that we write to disk.

```go
// generateSegments cuts a given file at the timeStamps
// and writes the results into the current directory
func generateSegments(file string) (result []string) {
	ts := timeStamps(file)
	segmentDuration := "2"
	ext := filepath.Ext(file)
	name := file[0 : len(file)-len(ext)]

	for i, t := range ts {
		filename := fmt.Sprintf("%s_segment_%d%s", name, i, ext)
		args := []string{"-y", "-i", file, "-ss", strconv.FormatFloat(t.Seconds(), 'f', 0, 64), "-t", segmentDuration, "-map", "0:v:0", "-vcodec", "copy", filename}
		cmd := exec.Command("ffmpeg", args...)
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		result = append(result, filename)
	}
	return
}
```

We would then make a list of the segments generate prior and pass that list into ffmpeg to produce the final webp preview. We further clean uo afterwards.

```go
// makePreview generates the actual webp preview and writes it to current
// directory
func makePreview(file string) {
	files := generateSegments(file)
	var list string = "list.txt"

	// Create a temporary list that ffmppeg concat demuxer can consume
	f, err := os.Create(list)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	// Write files to list -- prefixed with "file"
	for _, file := range files {
		fmt.Fprintln(f, "file", file)
	}

	// Store file extension and file name
	ext := filepath.Ext(file)
	name := file[0 : len(file)-len(ext)]

	args := []string{"-y", "-safe", "0", "-f", "concat", "-i", filepath.Base(list), "-an", "-vcodec", "libwebp", "-loop", "0", "-preset", "picture", "-vf", "fps=6,scale=480:-1:flags=lanczos  ", "-qscale", "40", "-compression_level", "6", name + "_preview.webp"}
	cmd := exec.Command("ffmpeg", args...)
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}

	// Clean up temporarily created files
	files = append(files, filepath.Base(list))
	for _, f := range files {
		if err := os.Remove(f); err != nil {
			log.Fatal(err)
		}
	}
}
```

While we moved the main project over to [Codeberg](https://codeberg.org/Mediathek/), you will still find the [thumbnailer on github](https://github.com/Kukoon/thumbnailer/).
