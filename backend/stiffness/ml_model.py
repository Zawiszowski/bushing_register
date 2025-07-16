from dataclasses import dataclass



@dataclass
class user_input:
    mounting_component: int
    axle: int
    k_0: int
    min_force: int
    max_force: int


@dataclass
class register:
    mounting_component: int
    axle: int
    stiffness: list
    forces: list


    @property
    def k_0(self):
        """
        quasi-static factor, is in the stiffness y, near 0N forces (stiffness_x)
        """
        pass

    @property
    def min_force(self):
        """
        min from forces list
        """
        pass

    @property
    def max_force(self):
        """
        max from forces list
        """
        pass
    

def stiffness_prediction() -> list:
    pass