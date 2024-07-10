#!/usr/bin/env python
import json
import sys

try:
    envFile = sys.argv[1]
except IndexError as e:
    envFile = '.env'

with open(envFile, 'r') as f:
    content = f.readlines()

# removes whitespace chars like '\n' at the end of each line
content = [x.strip().split('=') for x in content if '=' in x]
print(json.dumps(dict(content)))