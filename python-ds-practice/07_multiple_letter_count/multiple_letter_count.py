def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    empty_dict = {}
    for ltr in phrase:
        empty_dict[ltr] = empty_dict.get(ltr, 0) + 1
    return empty_dict
