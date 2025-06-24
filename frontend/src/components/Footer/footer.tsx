import React from 'react';
import { FooterContainer, FooterLink, Container, ContentSection, ContactItem, SocialLink, SocialLinks, SocialSection, SocialText, Row, Column, SectionTitle, Logo, Description,
  LinkItem, Icon, Copyright } from './Footer.styles';
import type { SocialLinkData, ProductLink, UsefulLink } from '../../types';
import _logo from '../../assets/zawi4.png';
import { FaFacebook, FaTwitter, FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

// Component
const Footer: React.FC = () => {
  const socialLinks: SocialLinkData[] = [
    {
      href: '',
      icon: FaFacebook,
      label: 'Facebook'
    },
    {
      href: '',
      icon: FaTwitter,
      label: 'Twitter'
    },
    {
      href: '',
      icon: FaGoogle,
      label: 'Google'
    },
    {
      href: '',
      icon: FaGithub,
      label: 'GitLab'
    },
    {
      href: '',
      icon: FaLinkedin,
      label: 'LinkedIn'
    }
  ];

  const productLinks: ProductLink[] = [
    {
      href: '',
      text: 'VIbration systems'
    },
    {
      href: '',
      text: 'Air suspension'
    },
    {
      href: '',
      text: 'Brake systems'
    },
    {
      href: '',
      text: 'Bushing mounts'
    }
  ];

  const usefulLinks: UsefulLink[] = [
    {
      href: '',
      text: 'System'
    },
    {
      href: '',
      text: 'Process'
    },
    {
      href: '',
      text: 'Monitoring'
    },
    {
      href: '',
      text: 'IT Request'
    }
  ];

  return (
    <FooterContainer>
      <SocialSection>
        <SocialText>
          <span>Get connected with me on social networks:</span>
        </SocialText>

        <SocialLinks>
          {socialLinks.map((link, index) => (
            <SocialLink 
              key={index}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon/>
             
            </SocialLink>
          ))}
        </SocialLinks>
      </SocialSection>

      <ContentSection>
        <Container>
          <Row>
            <Column md={3} lg={4} xl={3}>
              <SectionTitle>
                <Logo src={_logo} alt=" Group Logo" />
                 
              </SectionTitle>
              <Description>
                Specialized in Django, React, FastAPI, Python, JavaScript
                I build modern web applications in the automotive industry
              </Description>
            </Column>

            <Column md={2} lg={2} xl={2}>
              <SectionTitle>Products</SectionTitle>
              {productLinks.map((link, index) => (
                <LinkItem key={index}>
                  <FooterLink 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </FooterLink>
                </LinkItem>
              ))}
            </Column>

            <Column md={3} lg={2} xl={2}>
              <SectionTitle>Useful links</SectionTitle>
              {usefulLinks.map((link, index) => (
                <LinkItem key={index}>
                  <FooterLink 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </FooterLink>
                </LinkItem>
              ))}
            </Column>

            <Column md={4} lg={3} xl={3}>
              <SectionTitle>Contact</SectionTitle>
              <ContactItem>
                <Icon className="fas fa-home" marginRight="0.5rem" />
                Katowice
              </ContactItem>
              <ContactItem>
                <Icon className="fas fa-envelope" marginRight="0.75rem" />
                https://zawiszowski.github.io/portfolio/
              </ContactItem>
              <ContactItem>
                <Icon className="fas fa-phone" marginRight="0.75rem" />
                + 48 000 000 000
              </ContactItem>
              <ContactItem>
                <Icon className="fas fa-print" marginRight="0.75rem" />
                + 48 000 000 000
              </ContactItem>
            </Column>
          </Row>
        </Container>
      </ContentSection>

      <Copyright>
        © 2025 Copyright
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;