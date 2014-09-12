import re

data = open('index-brutal-asm.html').read()

"""
mini = re.sub('<script src="js/siopa-engine.js"></script>', '', data)
mini = re.sub('<script src="js/siopa.js"></script>', '<script src="siopa.min.js"></script>', mini)
mini = re.sub('<link rel="stylesheet" href="css/siopa-engine.css">', '<link rel="stylesheet" href="siopa.min.css">', mini)
"""

#mini = re.sub('[\n]', '', mini)
mini = re.sub('[\n]', '', data)
mini = re.sub('[\t]', ' ', mini)
mini = re.sub(' +', ' ', mini)
mini = re.sub('<!-- -->', '', mini)
open('index-brutal-final.html', 'w').write(mini)
