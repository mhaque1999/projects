def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    case_swap_string = ""
    for char in phrase:
        if char.upper() == to_swap or char.lower() == to_swap:
            if char.isupper():
                #print("uppercase to lower")
                case_swap_string += char.lower()
            else:
                #print("lowercase to upper")
                case_swap_string += char.upper()
        else:
            case_swap_string += char

    return case_swap_string

