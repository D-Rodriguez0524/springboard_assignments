"""Word Finder: finds random words from a dictionary."""
import random


class WordFinder:
    def __init__(self, path):
        """Reading file and reporting number of lines read"""
        file = open(path)
        self.words = self.parse(file)
        print(f"{len(self.words)} words read")

    def parse(self, file):
        """Parse file to list of words"""
        return [w.strip() for w in file]

    def random(self):
        """Returning a random word"""
        return random.choice(self.words)


class RandomWordFinder (WordFinder):
    """making a specialized wordfinder that excludes blanks lines/comments"""

    def parse(self, file):
        """Parse file to list of words"""
        return [w.strip() for w in file]
