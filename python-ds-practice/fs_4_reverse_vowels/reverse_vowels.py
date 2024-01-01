def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    vowel_set = set("aeiou")
    first_half_index = 0
    second_half_index = len(s) - 1
    string_list = list(s)

    while first_half_index < second_half_index:
        if not(string_list[first_half_index].lower() in vowel_set):
            first_half_index += 1
        elif not(string_list[second_half_index].lower() in vowel_set):
            second_half_index -= 1
        else:
            string_list[first_half_index], string_list[second_half_index] = string_list[second_half_index], string_list[first_half_index]
            first_half_index += 1
            second_half_index -= 1
    return "".join(string_list)

print(reverse_vowels("Hello!"))
print(reverse_vowels("Tomatoes"))
print(reverse_vowels("Reverse Vowels In A String"))
print(reverse_vowels("aeiou"))
print(reverse_vowels("why try, shy fly?"))
