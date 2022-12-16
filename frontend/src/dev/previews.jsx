import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import HomePage from "../pages/main";
import UserPage from "../pages/personal_cabinet";
import Log_in from "../Components/Log_in";
import ChooseActive from "../Components/ChooseActive";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
          <ComponentPreview path="/UserPage">
            <UserPage/>
          </ComponentPreview>
          <ComponentPreview path="/Log_in">
            <Log_in/>
          </ComponentPreview>
          <ComponentPreview path="/ChooseActive">
            <ChooseActive/>
          </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
