import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import HomePage from "../pages/main";
import UserPage from "../pages/personal_cabinet";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/HomePage">
                <HomePage/>
            </ComponentPreview>
          <ComponentPreview path="/UserPage">
            <UserPage/>
          </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
