import styled, { keyframes } from 'styled-components';
import { slideInDown } from 'react-animations';

const slideInDownAnimation = keyframes`${slideInDown}`;
export const SlideOutAnimation = styled.div`
  animation: .5s ${slideInDownAnimation};
`;