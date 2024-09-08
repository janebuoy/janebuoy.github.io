import re
import sys

def replace_footnotes(md_text):
    def replacement(match):
        nonlocal count
        footnote_number = match.group(1)
        count[footnote_number] = count.get(footnote_number, 0) + 1
        if count[footnote_number] == 1:
            return f'[\[{footnote_number}\]](#ref{footnote_number}){{#cite{footnote_number}}}'
        elif count[footnote_number] == 2:
            return f'[\[{footnote_number}\]](#cite{footnote_number}){{#ref{footnote_number}}}'
        else:
            return match.group(0)
    
    count = {}
    pattern = re.compile(r'\[(\d+)\]')
    return pattern.sub(replacement, md_text)

def main():
    if len(sys.argv) != 2:
        print("Usage: python replace_footnotes.py <input_file>")
        sys.exit(1)

    input_file = sys.argv[1]

    try:
        with open(input_file, 'r') as file:
            content = file.read()

        # Replace footnotes
        updated_content = replace_footnotes(content)

        # Write the updated content back to the same file
        with open(input_file, 'w') as file:
            file.write(updated_content)

        print(f"Footnotes have been updated in {input_file}")

    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
        sys.exit(1)
    except IOError as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
