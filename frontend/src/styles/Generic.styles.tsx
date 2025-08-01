import styled from "styled-components";
import { fadeInUp } from "./animation";

export const Section = styled.section<{ bg?: string }>`
  padding: 5rem 0;
  background: ${props => props.bg || 'transparent'};
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

export const Button = styled.button`
  background: #fff;
  color: #2563eb;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #2563eb;
    border-radius: 2px;
  }
`;

export const Grid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 2}, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const Row = styled.div`
  display: row;
`;

export const Col = styled.div`
  display: col;
`;

export const Context = styled.main`

  background-color:white;
  background-image: white; 
  padding: 3px;
  min-height: 100vh;

`;

export const AddBtn = styled(Button)`
margin-block: 1rem;
padding: 0.5rem 2rem;
border-radius: 10px;
color: black;
  background:rgb(202, 235, 214);
`

export const EditBtn = styled(Button)`
  padding: 0.5rem 2rem;
  margin: 0.5rem;
  border-radius: 10px;
  color: black;
  background:rgb(236, 234, 199);
`

export const DeleteBtn = styled(Button)`
padding: 0.5rem 2rem;
margin: 0.5rem;
border-radius: 10px;
color: black;
  background:rgb(226, 155, 143);

`


export const RowBoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
`;

export const ColBoot = styled.div<{ xs?: number, sm?: number, md?: number, lg?: number}>`
  padding-left: 15px;
  padding-right: 15px;
  flex: 0 0 auto;
  width: 100%;

  ${(props) =>
    props.xs &&
    `
      flex: 0 0 ${(100 * props.xs) / 12}%;
      max-width: ${(100 * props.xs) / 12}%;
    `}

  @media (min-width: 576px) {
    ${(props) =>
      props.sm &&
      `
        flex: 0 0 ${(100 * props.sm) / 12}%;
        max-width: ${(100 * props.sm) / 12}%;
      `}
  }

  @media (min-width: 768px) {
    ${(props) =>
      props.md &&
      `
        flex: 0 0 ${(100 * props.md) / 12}%;
        max-width: ${(100 * props.md) / 12}%;
      `}
  }

  @media (min-width: 992px) {
    ${(props) =>
      props.lg &&
      `
        flex: 0 0 ${(100 * props.lg) / 12}%;
        max-width: ${(100 * props.lg) / 12}%;
      `}
  }
`;