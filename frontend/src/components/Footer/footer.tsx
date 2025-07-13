import React from 'react';
import { FooterContainer, FooterLink, Container, ContentSection, SocialLink, SocialLinks, SocialSection, SocialText, Row, Column, SectionTitle, Logo, Description,
  LinkItem, IconWrapper, Copyright, ContactText } from './Footer.styles';
import type { SocialLinkData, ProductLink, UsefulLink, ContactData} from '../../types';
import _logo from '../../assets/blue_steve.png';
import { FaFacebook, FaTwitter, FaGoogle, FaGithub, FaLinkedin, FaHome, FaMailBulk, FaPhone  } from 'react-icons/fa';

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

  const contactData: ContactData[] = [
    {
      icon: FaHome,
      text: 'Katowice'
    },
    {
      icon: FaMailBulk,
      text: 'support@stevesleeve'
    },
    {
      icon: FaPhone,
      text: '+ 48 000 000 000'
    },
    {
      icon: FaPhone,
      text: '+ 48 000 000 000'
    },

  ]

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
                stevesleeve
                 
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
              {contactData.map((link, index) => (
                <LinkItem key={index}>
                  <IconWrapper><link.icon></link.icon></IconWrapper>
                  <ContactText
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </ContactText>
                </LinkItem>
              ))}

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