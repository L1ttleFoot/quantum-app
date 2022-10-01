import sympy as sy

n_i=sy.symbols("n_i")
n_j=sy.symbols("n_j")
n_k=sy.symbols("n_k")
omega_i=sy.symbols("omega_i")
omega_j=sy.symbols("omega_j")
omega_k=sy.symbols("omega_k")
const_n_dict={{n_i: 1, n_j: 2, n_k: 3}}
const_omega_dict={{omega_i: 1, omega_j: 1, omega_k: 21}}
ZAMENA={**const_n_dict, **const_omega_dict}
