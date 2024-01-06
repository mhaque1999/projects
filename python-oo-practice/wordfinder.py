"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    """Finds random words from a dictionary.
    
    >>> word_finder = WordFinder("words.txt")
    235886 words read

    >>> random.seed(1)

    >>> word_finder.random()
    'choler'

    >>> random.seed(2)

    >>> word_finder.random()
    'usherless'

    >>> random.seed(3)

    >>> word_finder.random()
    'enjambment'

    >>> random.seed(4)

    >>> word_finder.random()
    'endocyclic'

    >>> random.seed(5)

    >>> word_finder.random()
    'Rappite'
    """

    def __init__(self,text):
        """ creates a dictionary with all of the words in the file""" 
        self.dict = {}
        self.read_words(text)
        print(f"{len(self.dict)} words read")

    def read_words(self,text):
        """ reads the words from the file and puts it into the dictionary"""
        index = 1
        file = open(text, "r")
        for line in file: 
            self.dict[index] = line.strip()
            index += 1 
        file.close()

    def random(self):
        """ randomly chooses a word from the dictionary"""
        return random.choice( list(self.dict.values()) )

        

