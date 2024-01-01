def print_upper_words(words, must_start_with):
    """ Given a list of strings print each string in uppercase

        - words: list of strings to turn into uppercase
        - must_start_with: a set of chars to print only words that start with any char inside the set

        for example: 
            
            print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})
        
        this should print "HELLO", "HEY", "YO", and "YES" 
    """
    for word in words:
        if word[0] in must_start_with:
            print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],{"h", "y"})