
import { Container, BackgroundElements, FloatingShape, HeroSection, HeroSubtitle, HeroTitle, ButtonGroup, Button, StatCard, StatLabel, StatNumber,
    StatsGrid, StatsSection, SectionTitle, FeatureCard, FeatureDescription, FeatureIcon, FeatureTitle, FeaturesGrid, FeaturesSection,
    ProcessSection, ProcessStep, ProcessSteps, StepNumber, StepTitle, StepDescription, InfoCard, InfoGrid, InfoIcon, InfoList, InfoListItem,
    InfoSection, InfoText, InfoTitle
 } from './components';






// Main Component
const Home = () => {
  
  const features = [
    {
      icon: '🔧',
      title: 'Advanced Inventory Management',
      description: 'Comprehensive tracking of all bushing types, sizes, materials, and specifications with real-time inventory updates and automated reordering alerts.'
    },
    {
      icon: '📊',
      title: 'Detailed Analytics & Reports',
      description: 'Generate insightful reports on usage patterns, maintenance schedules, cost analysis, and performance metrics to optimize your operations.'
    },
    {
      icon: '🔍',
      title: 'Smart Search & Filtering',
      description: 'Powerful search functionality with advanced filters for material type, dimensions, application, manufacturer, and custom specifications.'
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'Access your bushing database anywhere with our responsive mobile interface, perfect for on-site inspections and field work.'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control, audit trails, data encryption, and compliance with industry standards.'
    },
    {
      icon: '⚙️',
      title: 'Integration Ready',
      description: 'Seamlessly integrate with your existing ERP, CAD, and maintenance management systems through our comprehensive API.'
    }
  ];

  const stats = [
    { number: '15,000+', label: 'Registered Bushings' },
    { number: '250+', label: 'Active Projects' },
    { number: '95%', label: 'Uptime Guarantee' },
    { number: '24/7', label: 'Support Available' }
  ];


  return (
    <>
      
      <Container>
        <BackgroundElements>
          <FloatingShape duration="8s" delay="0s" />
          <FloatingShape duration="10s" delay="2s" />
          <FloatingShape duration="7s" delay="4s" />
          <FloatingShape duration="9s" delay="1s" />
        </BackgroundElements>
        
        <HeroSection>
          <HeroTitle>
            Professional Bushing<br />
            Registry System
          </HeroTitle>
          <HeroSubtitle>
            The most advanced bushing management platform for engineering professionals. 
            Streamline your inventory, optimize maintenance schedules, and ensure precision in every project.
          </HeroSubtitle>
          <ButtonGroup>
            <Button className="primary">Start Free Trial</Button>
            <Button className="secondary">Watch Demo</Button>
          </ButtonGroup>
        </HeroSection>

        <StatsSection>
          <SectionTitle>Trusted by Industry Leaders</SectionTitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index} delay={`${index * 0.2}s`}>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>
        </StatsSection>

        <FeaturesSection>
          <SectionTitle>Powerful Features</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index} delay={`${index * 0.1}s`}>
                <FeatureIcon delay={`${index * 0.2}s`}>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </FeaturesSection>

        <ProcessSection>
          <SectionTitle>How It Works</SectionTitle>
          <ProcessSteps>
            <ProcessStep delay="0.2s">
              <StepNumber>1</StepNumber>
              <StepTitle>Register & Catalog</StepTitle>
              <StepDescription>
                Import your existing inventory or start fresh. Our intelligent system automatically categorizes and tags your bushings based on specifications.
              </StepDescription>
            </ProcessStep>
            <ProcessStep delay="0.4s">
              <StepNumber>2</StepNumber>
              <StepTitle>Track & Monitor</StepTitle>
              <StepDescription>
                Real-time monitoring of usage, wear patterns, and maintenance requirements. Get automated alerts before issues arise.
              </StepDescription>
            </ProcessStep>
            <ProcessStep delay="0.6s">
              <StepNumber>3</StepNumber>
              <StepTitle>Analyze & Optimize</StepTitle>
              <StepDescription>
                Generate comprehensive reports and insights to optimize your inventory, reduce costs, and improve operational efficiency.
              </StepDescription>
            </ProcessStep>
            <ProcessStep delay="0.8s">
              <StepNumber>4</StepNumber>
              <StepTitle>Scale & Integrate</StepTitle>
              <StepDescription>
                Seamlessly scale your operations and integrate with existing systems. Our platform grows with your business needs.
              </StepDescription>
            </ProcessStep>
          </ProcessSteps>
        </ProcessSection>

        <InfoSection>
          <SectionTitle>Why Choose Bushing Register?</SectionTitle>
          <InfoGrid>
            <InfoCard delay="0.2s">
              <InfoTitle>
                <InfoIcon>🎯</InfoIcon>
                Industry Expertise
              </InfoTitle>
              <InfoText>
                Built by engineers, for engineers. Our platform is designed specifically for the unique challenges of precision manufacturing and mechanical engineering.
              </InfoText>
              <InfoList>
                <InfoListItem>20+ years of industry experience</InfoListItem>
                <InfoListItem>Compliance with ISO standards</InfoListItem>
                <InfoListItem>Specialized for precision components</InfoListItem>
                <InfoListItem>Continuous platform evolution</InfoListItem>
              </InfoList>
            </InfoCard>
            
            <InfoCard delay="0.4s">
              <InfoTitle>
                <InfoIcon>🚀</InfoIcon>
                Advanced Technology
              </InfoTitle>
              <InfoText>
                Leverage cutting-edge technology including AI-powered analytics, machine learning for predictive maintenance, and cloud-native architecture.
              </InfoText>
              <InfoList>
                <InfoListItem>AI-powered inventory optimization</InfoListItem>
                <InfoListItem>Machine learning analytics</InfoListItem>
                <InfoListItem>Real-time synchronization</InfoListItem>
                <InfoListItem>Scalable cloud infrastructure</InfoListItem>
              </InfoList>
            </InfoCard>
            
            <InfoCard delay="0.6s">
              <InfoTitle>
                <InfoIcon>🔧</InfoIcon>
                Complete Solution
              </InfoTitle>
              <InfoText>
                From small workshops to large manufacturing facilities, our comprehensive solution adapts to your specific needs and scales with your growth.
              </InfoText>
              <InfoList>
                <InfoListItem>Multi-location support</InfoListItem>
                <InfoListItem>Custom workflow configuration</InfoListItem>
                <InfoListItem>Extensive API integrations</InfoListItem>
                <InfoListItem>Dedicated support team</InfoListItem>
              </InfoList>
            </InfoCard>
          </InfoGrid>
        </InfoSection>
      </Container>
    </>
  );
};

export default Home;