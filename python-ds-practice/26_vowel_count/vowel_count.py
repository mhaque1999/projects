def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    vowel_dict = {}
    for char in phrase:
        if char.lower() == "a" or char.lower() == "e" or char.lower() == "i" or char.lower() == "o" or char.lower() == "u":
            if not( vowel_dict.get(char.lower()) ):
                vowel_dict[char.lower()] = 1
            else:
                vowel_dict[char.lower()] += 1

    return vowel_dict

