---
title: Creating animated thumbnails with ffmpeg in Go!
author: Janne Jensen
category: [blog]
published: false
meta:
  updatedAt: 2023-01-03T16:55:00+0100
  createdAt: 2023-03-09T11:28:47+0100
---

Let's start with a little bit of background context: When our local community center had to cancel all in-person events at the height of the pandemic, we began to pursue live streaming and decided to commit to better documentation of past events. As long-time proponents of self-hosted open source software, we did the <del>un</del>reasonable thing and decided to develop our own media archive. We arrived at this conclusion (a) due to data privacy concerns with uploading all of our videos to YouTube, (b) because available self-hostable solutions were slow and had bad UI/UX and (c) for the mere fun and experience that comes with DIY.

## The right tools for the job

While I began writing [the user and admin facing side of the project](https://gitlab.com/kukoon/mediathek/media-ui), my colleague elegantly stitched together the necessary PostgreSQL database and OvenMediaEngine (OME) server [for the backend](https://gitlab.com/kukoon/mediathek/media-server). After a quite a bit of tweaking and polishing, we had a working prototype enabled us to schedule upcoming live streamins prior to the event using the the admin dashboard. When on site, we simply fired up OBS and went live within a second or less, thanks to the WebRTC and HLS protocols provided by OME.

## Animated thumbnails

On the side, I began to experiment with `ffmpeg` to generate animated thumbnails for the uploaded videos. The instructions were fairly simply:

1. Prope the video a couple of times and return a list of time stamps
2. Cut a short segment from the video at each time stamps
3. Concatenate the segments and save as WebP file

```shell
$ ffprobe -i 'video_file.mp4' -v error -select_streams v:0 \n
-show_entries stream=duration -of default=noprint_wrappers=1:nokey=1
```

The correspondig Go function would then look as follows:

```go
var file string = os.Args[1]

// getTimeStamps returns four time stamps at 20, 40, 60 and 80% of a given
// video file in the form of an array of type time.Duration
func getTimeStamps(file string) []time.Duration {
	var stampAt = [4]float64{0.2, 0.4, 0.6, 0.8}
	var timeStamps []time.Duration

	args := []string{
		"-i", file,
		"-v", "error",
		"-select_streams", "v:0",
		"-show_entries", "stream=duration",
		"-of", "default=noprint_wrappers=1:nokey=1"}
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
