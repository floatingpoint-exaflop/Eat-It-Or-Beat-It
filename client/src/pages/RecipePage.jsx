import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Recipe from '../components/Recipe';

import { useHistory } from 'react-router-dom'



export default function RecipePage (props){



  return (
    <>
        <Recipe />
    </>
  );
};

