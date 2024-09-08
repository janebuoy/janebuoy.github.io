---
title: Bytewise warming stripes with python!
author: Janne Jensen
category:
  - words
published: true
tags:
  - python
  - data visualisation
meta:
  updatedAt: 2024-08-01T08:04:00+0100
  createdAt: 2024-07-31T16:22:47+0100
---

The [Warming Stripes](https://en.wikipedia.org/wiki/Warming_stripes) are a now famous example of successful data visualization! And rightly so. Here, I show how the same visualization of global temperature anomalies can be recreated "bytewise" using Python. I have done this originally in an `.ipynb` notebook, but decided to publish it here in more succinct form. The underlying dataset is [HadCRUT4](https://doi.org/10.1029/2011JD017187) from the Met Office Hadley Centre [\[1\]](#ref1){#cite1}. It contains a time series with temperature anomalies between 1850 and 2022, which are the median of 100 regional observation series. The relative anomalies refer to the reference time period 1961-1990.

![Warming Stripes installation in Leipzig](/warming-stripes-sachsenbruecke.png)
Photo: Silvio Bürger, Montage: [Leipzig fürs Klima](https://sachsenbruecke.de/)

## Preparations

First, we get read the URL into a `pandas` dataframe.

```python
import pandas as pd

fqdn = "https://www.metoffice.gov.uk"
filepath = "/hadobs/hadcrut4/data/current/time_series/HadCRUT.4.6.0.0.annual_ns_avg.txt"
df = pd.read_fwf(fqdn + filepath,
                 # Use column 0 as the index
                 index_col=0,
                 # Use only columns 0 and 1 from the original data
                 usecols=(0, 1),
                 # Set custom column names
                 names=['year', 'anomaly'],
                 # The original data does not have a header
                 header=None)
```

As a result, each column of the dataframe represents the temperature anomaly for one year, which, depending on the severity of the anomaly, will be displayed as a blue or red RGB color value.

We also set a couple of variables that we will need later. We need to be careful here, because the desired width of our image must be a multiple of 4.

```python
# Set image dimensions
# Only multiples of 4! Fortunately, len(df.index) is 172 :)
width = len(df.index)
assert width % 4 == 0, "Width must be a multiple of 4!"
height = 25

image = [] # two-dimensional array of color values (RGB triples)
row = [] # one-dimensional array of color values (RGB tuples)
```

## Color Mappings

The anomaly data, representing deviations from a baseline temperature, is first normalized to a range between 0 and 1. This normalization allows us to map these values to specific colors:

- When the normalized anomaly value is 0.5, the corresponding color is white.
- A normalized value of 0.4 maps to a bluish color.
- For a normalized value of 0.8, the resulting color is a warm reddish tone.

```python
for column in range(width):
    anomaly = df.to_numpy()[column][\[0\]](#ref0){#cite0}

    # Normalize value:
    # [-1, 1] plus 1 is [0, 2]
    # divided by 2 is [0, 1]
    normalized_anomaly = (anomaly + 1) / 2

	# red = 1 if 'normalized_anomaly' > 0.5
    red = min(1, 2 * normalized_anomaly)
    # blue = 1 if 'normalized_anomaly' < 0.5
    blue = min(1, 2 * (1 - normalized_anomaly))
    # green = 1 if normalized_anomaly == 0.5
    green = 1 - abs(red - blue)

    # Transform color values [0,1] to color value between 0 and 255.
    rgb_tuple = tuple(int(val * 255) for val in (red, green, blue))

    row.append(rgb_tuple)

# Create the image row by row
for _ in range(height):
    image.append(row)
```

## The BMP Format

If you would like to do the deep dive into low level raster graphics, Luna McNulty has done a great job with "[Writing BMP Images from Scratch](https://lmcnulty.me/words/bmp-output/)" in C! The functions to write the actual file have been adopted from [course materials and exercises](https://scm.cms.hu-berlin.de/ibi/damostin/-/blob/master/notebooks/3_Repraesentation_von_Text_Bild_Ton.ipynb) prepared by Robert Jäschke [\[2\]](#ref2){#cite2}.

```python
def write_bmp_header(f, file_size):
    # Write BMP header
    f.write("BM".encode("ASCII"))  # "BM" identifier
    f.write(int.to_bytes(file_size, 4, "little"))  # File size in bytes
    f.write(int.to_bytes(0, 4, "little"))  # Reserved, must be zero
    f.write(int.to_bytes(54, 4, "little"))  # Offset to the pixel data

def write_dib_header(f, width, height):
    # Write DIB header
    f.write(int.to_bytes(40, 4, "little"))  # DIB header size
    f.write(int.to_bytes(width, 4, "little"))  # Width of the image
    f.write(int.to_bytes(height, 4, "little"))  # Height of the image
    f.write(int.to_bytes(1, 2, "little"))  # Number of color planes, must be 1
    f.write(int.to_bytes(24, 2, "little"))  # Bits per pixel (24 for RGB)
    f.write(int.to_bytes(0, 4, "little"))  # Compression method
    f.write(int.to_bytes(3 * width * height, 4, "little"))  # Image size in bytes
    f.write(int.to_bytes(0, 4, "little"))  # Horizontal resolution
    f.write(int.to_bytes(0, 4, "little"))  # Vertical resolution
    f.write(int.to_bytes(0, 4, "little"))  # Number of colors in the palette
    f.write(int.to_bytes(0, 4, "little"))  # Important colors used

def create_bmp_file(filename, width, height):
    # Calculate file size (header + image data)
    file_size = 54 + 3 * width * height

    with open(filename, "wb") as f:
        # Write the BMP and DIB headers
        write_bmp_header(f, file_size)
        write_dib_header(f, width, height)

        # Write image data
        for row in reversed(image):
            for column in row:
                # Write BGR instead of RGB
                f.write(bytes(column[::-1]))
```

Finally, we call the function to assemble the BIP image.

```python
create_bmp_file("image.bmp", width, height)
```

## The Result (again)

![The output of our script: Warming stripes with data from 1850 to 2022](/image.png)
This is an enlarged version of the resulting [image.bmp](/image.bmb).

The current version of the warming stripes, spanning the years 1850 to 2023. Notice that we are off by one, as we do not include the year 2023 in our image.

![Warming Stripes rendering with data from 1850 to 2023](https://showyourstripes.info/stripes/GLOBE---1850-2023-MO.png)
Graphics and lead scientist: [Ed Hawkins](http://www.met.reading.ac.uk/~ed/home/index.php), National Centre for Atmospheric Science, University of Reading., National Centre for Atmospheric Science, UoR.

The color mapping does not match the original, but for this "bytewise" demonstration, it should suffice. Of course, there are easier ways to achieve this -- e.g. Maximilian Nöthe has [published a version with a more suitable ColorMap in the Matplotlib blog](https://matplotlib.org/matplotblog/posts/warming-stripes/).

## References

[\[1\]](#cite1){#ref1} C. P. Morice, J. J. Kennedy, N. A. Rayner, and P. D. Jones, “Quantifying uncertainties in global and regional temperature change using an ensemble of observational estimates: The HadCRUT4 data set,” _J. Geophys. Res._, vol. 117, no. D8, p. 2011JD017187, Apr. 2012, doi: [10.1029/2011JD017187](https://doi.org/10.1029/2011JD017187).

[\[2\]](#cite2){#ref2} R. Jäschke, “Datenstrukturen und -integration.” Mar. 26, 2020. Accessed: Jul. 31, 2024. [Online]. Available: https://scm.cms.hu-berlin.de/ibi/damostin
