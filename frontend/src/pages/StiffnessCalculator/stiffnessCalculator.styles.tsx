import styled from 'styled-components'
import steve from '../../assets/steve_dimensions_transparent3.png'

export const SteveDimensions = styled.img.attrs({
  src: `${steve}`
  })`

  width: 600px;
  height: 500px;
  /* margin: 1rem; */
  @media screen and (max-width: 877px) {
    margin-left: 4rem;
  }

`;