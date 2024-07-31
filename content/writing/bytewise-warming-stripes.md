---
title: Bytewise warming stripes with python!
author: Janne Jensen
category:
  - writing
published: true
meta:
  updatedAt: 2024-07-31T16:22:47+0100
  createdAt: 2024-07-31T16:22:47+0100
---

The [Warming Stripes](https://en.wikipedia.org/wiki/Warming_stripes) are a now famous example of successful data visualization! And rightly so. Here, I show how the same visualization of global temperature anomalies can be recreated "bytewise" using Python. I have done this originally in an `.ipynb` notebook, but decided to publish it here in more succinct form. The underlying dataset is [HadCRUT4](https://doi.org/10.1029/2011JD017187) from the Met Office Hadley Centre [1]. It contains a time series with temperature anomalies between 1850 and 2021, which are the median of 100 regional observation series. The relative anomalies refer to the reference time period 1961-1990.

As a result, each column represents the temperature anomaly for one year, which, depending on the severity of the anomaly, will displayed as a blue or red RGB color value.

For the "bytewise" demonstration, the result should suffice at this point. Of course there are easier ways to achieve this. Maximilian Nöthe has [published a version with a more suitable ColorMap in the Matplotlib blog](https://matplotlib.org/matplotblog/posts/warming-stripes/).

```python
import pandas as pd

url = "https://www.metoffice.gov.uk/hadobs/hadcrut4/data/current/time_series/HadCRUT.4.6.0.0.annual_ns_avg.txt"
df = pd.read_fwf(url,
                 index_col=0,                # Use column 0 as the index
                 usecols=(0, 1),             # Use only columns 0 and 1 from the original data
                 names=['year', 'anomaly'],  # Set custom column names
                 header=None)                # The original data does not have a header
```

## Color Mappings

The anomaly data, representing deviations from a baseline temperature, is first normalized to a range between 0 and 1. This normalization allows us to map these values to specific colors:

- When the normalized anomaly value is 0.5, the corresponding color is white.
- A normalized value of 0.4 maps to a bluish color.
- For a normalized value of 0.8, the resulting color is a warm reddish tone.

```python
# Set image dimensions
width = len(df.index) # Only multiples of 4! Fortunately, len(df.index) is 172 :)
assert width % 4 == 0, "Width must be a multiple of 4!"
height = 25

image = [] # two-dimensional array of color values (RGB triples)
row = [] # one-dimensional array of color values (RGB tuples)
```

```python

for column in range(width):
    anomaly = df.to_numpy()[column][0]

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

$TEXT about the structure of a BMP file.

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
    f.write(int.to_bytes(0, 4, "little"))  # Compression method (0 = no compression)
    f.write(int.to_bytes(3 * width * height, 4, "little"))  # Image size in bytes
    f.write(int.to_bytes(0, 4, "little"))  # Horizontal resolution (pixels per meter)
    f.write(int.to_bytes(0, 4, "little"))  # Vertical resolution (pixels per meter)
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
## References

[1] C. P. Morice, J. J. Kennedy, N. A. Rayner, and P. D. Jones, “Quantifying uncertainties in global and regional temperature change using an ensemble of observational estimates: The HadCRUT4 data set,” _J. Geophys. Res._, vol. 117, no. D8, p. 2011JD017187, Apr. 2012, doi: [10.1029/2011JD017187](https://doi.org/10.1029/2011JD017187).