
py_head = "py:__head"

def create(from_, to=None):
    with open(from_, encoding="utf-8") as py_file:
        py_content = py_file.read().splitlines()
        content = [py_head]

        for line in py_content:
            if line.startswith("#py:"):
                content.append(line)

    content = "\n".join(content)

    if to is None:
        return content
    elif to == "print":
        print(content)
    else:
        with open(to, 'w', encoding="utf-8") as template:
            template.write(content)


if __name__ == '__main__':
    import sys
    if len(sys.argv) == 3:
        create(sys.argv[1], sys.argv[2])
    elif len(sys.argv) == 2:
        create(sys.argv[1])
    else:
        print("Usage: python template.py infile [outfile or print]")
