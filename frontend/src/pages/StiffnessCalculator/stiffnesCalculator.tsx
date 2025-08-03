import { useEffect, useState} from 'react'
import { Container, BackgroundElements, FloatingShape, HeroSection, HeroSubtitle, HeroTitle, StatsSection, SectionTitle, FeaturesSection
 } from '../Home/home.styles';
import axios from 'axios';
import { SteveDimensions } from './stiffnessCalculator.styles';
import { Input, Button } from 'reactstrap';
import type { BushingParameters } from '../../types';

import { useMountingComponent } from '../../hooks/useMountingList';
import { useAuthContext } from '../../context/AuthContext';
import { defaultMountingComp } from '../Register/register';
import { notify_success, validation_info_error } from '../../utils/basicToasts';
import { DRF_ADRESS } from '../../data/constants';

import Plot from 'react-plotly.js';

const defaultBushingParemeters = {

      inner_diameter: 25,
      outer_diameter: 70,
      length: 80,
  
      mounting_component: -1,
      axle: 'Rear',
      min_force: -200,
      max_force: 200,
      shear_modulus: 200
  
  
}

interface PlotType {
  x: Array<number>,
  y: Array<number>,
  type: string,
  mode: string,
}

const StiffnesCalculator = () => {
  const {config} = useAuthContext();
  const {mountingComp }= useMountingComponent(config, defaultMountingComp)
  const axle = ['Front','Rear']
      const mc_name_init = 'other'

  const mc_id_init = JSON.parse(JSON.stringify(mountingComp[0].id !== -1 && mountingComp.find(item => item.name.toLowerCase() === mc_name_init)?.id ))
  const [mountingCompId, setMountingCompId] = useState(mc_id_init)
  const [bushingParameters, setBushingParemeters] = useState<BushingParameters>(defaultBushingParemeters)
  const [stiffnessPlot, setStiffnessPlot] = useState<PlotType>()

    const handleChange = (e : any) => {
        // if (readOnly) return;
        let {name, value} = e.target;
     
    
        if(e.target.name ==='mounting_component') {
            setBushingParemeters({...bushingParameters, [name]: parseInt(value)});

            setMountingCompId(parseInt(value))

            // setValidate({...validate, project_id: true, [name]: true});


        }else{
            setBushingParemeters({...bushingParameters, [name]: value});
            // setValidate({...validate, [name]: true});
        }

    };
   
  const estimateShearModulus = () => {
    const {shear_modulus, ...rest} = bushingParameters

    axios
      .post( DRF_ADRESS+ "/calculate_api/estimate_shear_modulus/", rest, config)
      .then(res => {


        console.log(res.data.data)
        setBushingParemeters({...bushingParameters, shear_modulus: res.data.data})
        notify_success('ok')
        
      })
      .catch(res => validation_info_error(res))
  }

  const requestStiffness = () => {
    axios
      .post( DRF_ADRESS+ "/calculate_api/calculate_stiffness/", bushingParameters, config)
      .then(res => {


        console.log(res.data.data)
        setStiffnessPlot(
              {
              x: res.data.data.forces,
              y: res.data.data.stiffness,
              type: 'scatter',
              mode: 'lines+markers',
              })
        notify_success('ok')
        
      })
      .catch(res => validation_info_error(res))
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
              value={bushingParameters.mounting_component}
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
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            minimal Force
            <Input
              // valid={!readOnly && validate.client}
              // invalid={!readOnly && !validate.client}
              type="number"
              name="min_force"
              value={bushingParameters.min_force}
              onChange={handleChange}
              placeholder="minimal Force"
              style={{width:'50%', margin: '1rem'}}
            ></Input>

            maximum Force
            <Input
              type="number"
              name="max_force"
              value={bushingParameters.max_force}
              onChange={handleChange}
              placeholder="maximum force"
              style={{width:'50%', margin: '1rem'}}
            ></Input>
            </div>

        </FeaturesSection>

        <FeaturesSection>
            <SectionTitle>Pass or Estimate Shear Modulus</SectionTitle>
            <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            Shear modulus
            <Input
              type="number"
              name="shear_modulus"
              value={bushingParameters.shear_modulus}
              onChange={handleChange}
              placeholder="shear modulus"
              style={{width:'200px', margin: '1rem'}}

            ></Input>

            <Button
              onClick={estimateShearModulus}
            >Estimate with Gemini</Button>
            </div>

            
        </FeaturesSection>

        <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
        <Button
          onClick={requestStiffness}
        >Apply and calculate stiffness!</Button>
        </div>

        <StatsSection >

          <SectionTitle>Dynamic Stiffness Chart</SectionTitle>
          <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
          <Plot
            data={[stiffnessPlot]}
            layout={{
              title: 'Transparent Background',
              paper_bgcolor: 'rgba(0,0,0,0)',   
              plot_bgcolor: 'rgba(0,0,0,0)',    
            }}
          ></Plot>
          </div>
         
        </StatsSection>


      </Container>
    </>
  );
};

export default StiffnesCalculator;