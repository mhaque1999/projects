"""Madlibs Stories."""


class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
                ["last_name", "noun", "letter", "3_letter_noun", "plural_noun", "sound"],
                """Big Mc {last_name} had a {noun}, {letter}-{3_letter_noun}, {letter}, {3_letter_noun}.
                O. On this {noun} he had some {plural_noun}, {letter}, -3 {3_letter_noun}, {letter}-{3_letter_noun} O.
                
                With a {sound}-{sound} here, and a {sound}-{sound} there, everywhere a 
                {sound}-{sound} {letter}-{3_letter_noun}, {letter}-{3_letter_noun} O."""
)

story3 = Story(
                [],
                """The day I saw the Monkey King {verb} was one of the most interesting
                days of the year"""
)
