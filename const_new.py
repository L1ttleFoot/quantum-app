import sympy as sy

n_i=sy.symbols("n_i")
n_j=sy.symbols("n_j")
omega_i=sy.symbols("omega_i")
omega_j=sy.symbols("omega_j")
A_iii=sy.symbols("A_iii")
A_iij=sy.symbols("A_iij")
A_ijj=sy.symbols("A_ijj")
A_jjj=sy.symbols("A_jjj")
const_n_dict={n_i: 1, n_j: 1}
const_omega_dict={omega_i: 2, omega_j: 2}
const_angarmonik_dikt={A_iii: 3, A_iij: 3, A_ijj: 3, A_jjj: 3}
ZAMENA={**const_n_dict, **const_omega_dict, **const_angarmonik_dikt}
