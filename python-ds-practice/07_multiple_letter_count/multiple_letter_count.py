def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    letter_dictionary = {}
    for char in phrase:
        if not(letter_dictionary.get(char)):
            letter_dictionary[char] = 1
        else:
            letter_dictionary[char] += 1

    return letter_dictionary
