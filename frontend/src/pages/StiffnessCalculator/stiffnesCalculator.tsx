import { useEffect, useState} from 'react'
import { Container, BackgroundElements, FloatingShape, HeroSection, HeroSubtitle, HeroTitle, StatsSection, SectionTitle, FeaturesSection
 } from '../Home/home.styles';

import { SteveDimensions } from './stiffnessCalculator.styles';
import { Input, Button } from 'reactstrap';
import type { BushingParameters } from '../../types';

import { useMountingComponent } from '../../hooks/useMountingList';
import { useAuthContext } from '../../context/AuthContext';
import { defaultMountingComp } from '../Register/register';


const defaultBushingParemeters = {

      inner_diameter: 25,
      outer_diameter: 70,
      length: 80,
  
      mountingComp: defaultMountingComp,
      axle: 'Rear',
      min_force: 200,
      max_force: 200,
      shear_modulus: 200
  
  
}

const StiffnesCalculator = () => {
  const {config} = useAuthContext();
  const {mountingComp }= useMountingComponent(config, defaultMountingComp)
  const axle = ['Front','Rear']
      const mc_name_init = 'other'

  const mc_id_init = JSON.parse(JSON.stringify(mountingComp[0].id !== -1 && mountingComp.find(item => item.name.toLowerCase() === mc_name_init)?.id ))
  const [mountingCompId, setMountingCompId] = useState(mc_id_init)
  const [bushingParameters, setBushingParemeters] = useState<BushingParameters>(defaultBushingParemeters)

    const handleChange = (e : any) => {
        // if (readOnly) return;
        let {name, value} = e.target;
     
    
        if(e.target.name ==='mounting_component') {
            setBushingParemeters({...bushingParameters, [name]: value});

            setMountingCompId(parseInt(value))

            // setValidate({...validate, project_id: true, [name]: true});


        }else{
            setBushingParemeters({...bushingParameters, [name]: value});
            // setValidate({...validate, [name]: true});
        }

    };
  const estimateShearModulus = () => {

  }

  const requestStiffness = () => {

  }

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
            Stiffness calculator<br />
            Registry System
          </HeroTitle>
          <HeroSubtitle>
            The most advanced bushing calculation system for simulation stiffness factors. 
            Streamline your inventory, optimize maintenance schedules, and ensure precision in every project.
          </HeroSubtitle>

                    <HeroSubtitle>
                comming soon ...
          </HeroSubtitle>
        </HeroSection>

        <StatsSection >
          <SectionTitle>Bushing Dimensions</SectionTitle>
          
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
              d: <Input 
                style={{width: '100px'}}
                type="number"
                name="inner_diameter"
                value={bushingParameters.inner_diameter}
                onChange={handleChange}
                placeholder="inner diameter"
                
                ></Input>
              <SteveDimensions ></SteveDimensions>
              D: <Input 
                style={{width: '100px'}}
                type="number"
                name="outer_diameter"
                value={bushingParameters.outer_diameter}
                onChange={handleChange}
                placeholder="outer diameter"
              ></Input>
            </div>
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
              H: 
            <Input 
                style={{width: '100px'}}
                type="number"
                name="length"
                value={bushingParameters.length}
                onChange={handleChange}
                placeholder="length"
            
            ></Input>
            </div>
            

        </StatsSection>

        <FeaturesSection>
            <SectionTitle>Bushing Info</SectionTitle>

            Mounting Component
            <Input               
              type='select'
              name="mounting_component"
              value={mountingCompId}
              onChange={handleChange}
              placeholder="Choice component"
            >
              {
                mountingComp.map(mc => (
                    <option value={mc.id} key={mc.id}>{mc.name?.toUpperCase()}</option>
                ))
              }
            </Input>

            Axle
            <Input 
              type='select'
              name="axle"
              value={bushingParameters.axle}
              onChange={handleChange}
              placeholder="Choice axle"
            >
              {
                axle.map( (value, index) => (
                    <option value={value} key={index}>{(value.toUpperCase())}</option>
                  ) )
              }
            </Input>

            minimal Force
            <Input
              // valid={!readOnly && validate.client}
              // invalid={!readOnly && !validate.client}
              type="number"
              name="min_force"
              value={bushingParameters.min_force}
              onChange={handleChange}
              placeholder="minimal Force"
            ></Input>

            maximum Force
            <Input
              type="number"
              name="max_force"
              value={bushingParameters.max_force}
              onChange={handleChange}
              placeholder="maximum force"
            ></Input>

        </FeaturesSection>

        <FeaturesSection>
            <SectionTitle>Pass or Estimate Shear Modulus</SectionTitle>

            Shear modulus
            <Input
              type="number"
              name="shear_modulus"
              value={bushingParameters.shear_modulus}
              onChange={handleChange}
              placeholder="shear modulus"
            ></Input>

            <Button
              onClick={estimateShearModulus}
            >Estimate with Gemini</Button>

            
        </FeaturesSection>

        <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <Button
          onClick={requestStiffness}
        >Apply and calculate stiffness!</Button>
        </div>

        <StatsSection >

          <SectionTitle>Dynamic Stiffness Chart</SectionTitle>
         
        </StatsSection>


      </Container>
    </>
  );
};

export default StiffnesCalculator;