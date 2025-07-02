import styled from 'styled-components'

import{
    Modal, 
    ModalBody,
    Input,
    
} from 'reactstrap';

export const MyModal = styled(Modal)`
    max-width: 900px;
`;

export const MyModalBody = styled(ModalBody)`
    display: flex;
    flex-direction: column;
`;

export const MainModalBodyDiv = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    /* padding-left:2vw; */
    padding-right:2vw;
`

export const MyInput = styled(Input)`  
    flex:2;
    margin-bottom: 10px;
    text-align: center;
    margin-left: 5px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        display: none;}
`;

export const OneColumnDiv = styled.div`
    flex:2;
    display: flex;
    flex-direction: column;
    margin-right:20px;
    text-align:center;
`;

export const RemoveButton = styled.button`
    flex:1;
    margin:0px;
    margin-bottom: 10px;
    margin-left: 3vw;
    margin-right: 10px;
    padding: 0.25em 1em;
    border: 2px solid darkgray;
    border-radius: 10px;
    display: block;
    background-color: darkgray;
    color: white;

  &:hover {
  font-size: 1em;
  border: 2px solid black;
  border-radius: 10px;
  display: block;
  background-color: black;
  color: white;
  }`

export const AddButton = styled(RemoveButton)`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid grey;
    background-color: grey; 
  
  &:hover {
  margin: 1em;
  padding: 0.25em 1em;
  }`

export const BottomButtonDiv = styled.div`
    order:2;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`
export const MySpan = styled.span`
    margin-left:20px;
    margin-top:5px;
`
export const TitleSpan = styled.span`
    font-size:24px;
    margin-bottom:15px;
    font-weight: 500;
`