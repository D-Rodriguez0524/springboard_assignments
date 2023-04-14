def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factored_list = [n for n in range(1, num // 2 + 1) if num % n == 0]
    factored_list.append(num)
    return factored_list

    # or could write by hand with a while loop
    #
    # factors = []
    #
    # while(n <= num):
    #     if num % n == 0:
    #         factors.append(n)
    #     n += 1
    #
    # return factors
