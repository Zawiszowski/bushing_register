import styled from 'styled-components';


// Styled Components
export const FooterContainer = styled.footer`
  background-color: #343a40;
  color: #6c757d;
  text-align: center;

  @media (min-width: 992px) {
    text-align: start;
  }
`;

export const SocialSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #6c757d;

  @media (min-width: 992px) {
    justify-content: space-between;
  }
`;

export const SocialText = styled.div`
  margin-right: 3rem;
  color: #f8f9fa;
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SocialLink = styled.a`
  color: #6c757d;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #f8f9fa;
  }
`;

export const ContentSection = styled.section`
  padding: 0;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
  color: #f8f9fa;
  margin-top: 3rem;

  @media (min-width: 768px) {
    text-align: start;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-left: -15px;
  margin-right: -15px;
`;

export const Column = styled.div<{ md?: number; lg?: number; xl?: number }>`
  padding: 0 15px;
  margin-bottom: 1.5rem;
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 ${props => props.md ? (props.md / 12) * 100 : 100}%;
  }

  @media (min-width: 992px) {
    flex: 0 0 ${props => props.lg ? (props.lg / 12) * 100 : (props.md ? (props.md / 12) * 100 : 100)}%;
  }

  @media (min-width: 1200px) {
    flex: 0 0 ${props => props.xl ? (props.xl / 12) * 100 : (props.lg ? (props.lg / 12) * 100 : (props.md ? (props.md / 12) * 100 : 100))}%;
  }

  @media (min-width: 768px) {
    margin-bottom: ${props => props.md === 4 ? '0' : '1.5rem'};
  }

  margin-left: auto;
  margin-right: auto;
`;

export const SectionTitle = styled.h6`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 90px;
  height: 90px;
  margin: 0.5rem;
`;

export const Description = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const LinkItem = styled.p`
  margin-bottom: 0.75rem;
`;

export const FooterLink = styled.a`
  color: #6c757d;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #f8f9fa;
  }
`;

export const ContactItem = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const Icon = styled.i<{ marginRight?: string }>`
  color: #f8f9fa;
  margin-right: ${props => props.marginRight || '0.5rem'};
  width: 16px;
`;

export const Copyright = styled.div`
  text-align: center;
  color: #f8f9fa;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
`;