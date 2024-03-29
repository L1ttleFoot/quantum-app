import sympy as sy

number_of_vibrational_degrees=3
max_indignation_step=2
type_anharmonic_const="k"
n_i=sy.symbols("n_i")
n_j=sy.symbols("n_j")
n_k=sy.symbols("n_k")
omega_i=sy.symbols("omega_i")
omega_j=sy.symbols("omega_j")
omega_k=sy.symbols("omega_k")
A_iii=sy.symbols("A_iii")
A_iij=sy.symbols("A_iij")
A_iik=sy.symbols("A_iik")
A_ijj=sy.symbols("A_ijj")
A_ijk=sy.symbols("A_ijk")
A_ikk=sy.symbols("A_ikk")
A_jjj=sy.symbols("A_jjj")
A_jjk=sy.symbols("A_jjk")
A_jkk=sy.symbols("A_jkk")
A_kkk=sy.symbols("A_kkk")
A_iiii=sy.symbols("A_iiii")
A_iiij=sy.symbols("A_iiij")
A_iiik=sy.symbols("A_iiik")
A_iijj=sy.symbols("A_iijj")
A_iijk=sy.symbols("A_iijk")
A_iikk=sy.symbols("A_iikk")
A_ijjj=sy.symbols("A_ijjj")
A_ijjk=sy.symbols("A_ijjk")
A_ijkk=sy.symbols("A_ijkk")
A_ikkk=sy.symbols("A_ikkk")
A_jjjj=sy.symbols("A_jjjj")
A_jjjk=sy.symbols("A_jjjk")
A_jjkk=sy.symbols("A_jjkk")
A_jkkk=sy.symbols("A_jkkk")
A_kkkk=sy.symbols("A_kkkk")
D_0=sy.symbols("D_0")
D_i=sy.symbols("D_i")
D_j=sy.symbols("D_j")
D_k=sy.symbols("D_k")
D_ii=sy.symbols("D_ii")
D_ij=sy.symbols("D_ij")
D_ik=sy.symbols("D_ik")
D_jj=sy.symbols("D_jj")
D_jk=sy.symbols("D_jk")
D_kk=sy.symbols("D_kk")
D_iii=sy.symbols("D_iii")
D_iij=sy.symbols("D_iij")
D_iik=sy.symbols("D_iik")
D_ijj=sy.symbols("D_ijj")
D_ijk=sy.symbols("D_ijk")
D_ikk=sy.symbols("D_ikk")
D_jjj=sy.symbols("D_jjj")
D_jjk=sy.symbols("D_jjk")
D_jkk=sy.symbols("D_jkk")
D_kkk=sy.symbols("D_kkk")
const_n_dict={n_i: 0, n_j: 0, n_k: 0}
const_omega_dict={omega_i: 1134.9, omega_j: 716.0, omega_k: 1089.2}
const_anharmonic_dict={A_iii: -49.5, A_iij: -27.72, A_iik: 0.0, A_ijj: -29.64, A_ijk: 0.0, A_ikk: -223.74, A_jjj: -19.06, A_jjk: 0.0, A_jkk: -53.59, A_kkk: 0.0, A_iiii: 2.47, A_iiij: -1.36, A_iiik: 0.0, A_iijj: -0.98, A_iijk: 0.0, A_iikk: 27.81, A_ijjj: 3.27, A_ijjk: 0.0, A_ijkk: 5.42, A_ikkk: 0.0, A_jjjj: 0.64, A_jjjk: 0.0, A_jjkk: -5.56, A_jkkk: 0.0, A_kkkk: 6.16}
const_dipoleX_dict={D_0: 0.0, D_i: -0.021305, D_j: -0.06529, D_k: 0.0, D_ii: -0.00366, D_ij: 0.00894, D_ik: 0.0481, D_jj: -0.00122, D_jk: 0.0, D_kk: 0.00769, D_iii: -0.001049, D_iij: 0.000177, D_iik: 0.0, D_ijj: -0.000537, D_ijk: 0.0, D_ikk: 0.0, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
const_dipoleY_dict={D_0: 0.0, D_i: 0.0, D_j: 0.0, D_k: 0.0, D_ii: 0.0, D_ij: 0.0, D_ik: 0.0, D_jj: 0.0, D_jk: 0.0, D_kk: 0.0, D_iii: 0.0, D_iij: 0.0, D_iik: 0.0, D_ijj: 0.0, D_ijk: 0.0, D_ikk: 0.0, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
const_dipoleZ_dict={D_0: 0.0, D_i: 0.0, D_j: 0.0, D_k: -0.2616, D_ii: 0.0, D_ij: 0.0, D_ik: 0.0, D_jj: 0.0, D_jk: 0.00154, D_kk: 0.0, D_iii: 0.0, D_iij: 0.0, D_iik: 0.00898, D_ijj: 0.0, D_ijk: 0.0, D_ikk: -0.000299, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
ZAMENA={n_i: 0, n_j: 0, n_k: 0, omega_i: 1134.9, omega_j: 716.0, omega_k: 1089.2, A_iii: -17.500892834367054, A_iij: -9.80049998724555, A_iik: 0.0, A_ijj: -10.479322497184635, A_ijk: 0.0, A_ikk: -79.10403561133909, A_jjj: -6.738727624707798, A_jjk: 0.0, A_jkk: -18.946926201893543, A_kkk: 0.0, A_iiii: 0.6175, A_iiij: -0.34, A_iiik: 0.0, A_iijj: -0.245, A_iijk: 0.0, A_iikk: 6.9525, A_ijjj: 0.8175, A_ijjk: 0.0, A_ijkk: 1.355, A_ikkk: 0.0, A_jjjj: 0.16, A_jjjk: 0.0, A_jjkk: -1.39, A_jkkk: 0.0, A_kkkk: 1.54}
ZAMENA_DX={D_0: 0.0, D_i: -0.015064909973179396, D_j: -0.046167001743669694, D_k: 0.0, D_ii: -0.000915, D_ij: 0.00447, D_ik: 0.02405, D_jj: -0.000305, D_jk: 0.0, D_kk: 0.0019225, D_iii: -6.181291778872403e-05, D_iij: 3.128947506750473e-05, D_iik: 0.0, D_ijj: -9.492908537429402e-05, D_ijk: 0.0, D_ikk: 0.0, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
ZAMENA_DY={D_0: 0.0, D_i: 0.0, D_j: 0.0, D_k: 0.0, D_ii: 0.0, D_ij: 0.0, D_ik: 0.0, D_jj: 0.0, D_jk: 0.0, D_kk: 0.0, D_iii: 0.0, D_iij: 0.0, D_iik: 0.0, D_ijj: 0.0, D_ijk: 0.0, D_ikk: 0.0, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
ZAMENA_DZ={D_0: 0.0, D_i: 0.0, D_j: 0.0, D_k: -0.18497913395840085, D_ii: 0.0, D_ij: 0.0, D_ik: 0.0, D_jj: 0.0, D_jk: 0.00077, D_kk: 0.0, D_iii: 0.0, D_iij: 0.0, D_iik: 0.0015874547237637994, D_ijj: 0.0, D_ijk: 0.0, D_ikk: -5.285623189369443e-05, D_jjj: 0.0, D_jjk: 0.0, D_jkk: 0.0, D_kkk: 0.0}
