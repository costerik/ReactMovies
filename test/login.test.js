import React from 'react';
import Login from '../src/components/login';
import { shallow } from 'enzyme';



describe('<Login/>',()=>{

    let loginComponent;
    beforeEach(()=>{
        loginComponent = shallow(
            <Login/>
          );

          return loginComponent;
    });

    it('Show spinner if both fields are filled when login button is pressed',()=>{
        let elements = loginComponent.find('.login');
        let user = loginComponent.find({ name:'user', type:'text'});
        let password = loginComponent.find({ name:'password', type:'password'});
        let button = loginComponent.find('Button');
    
        user.simulate('change', { target: { name: 'user', value: 'text' }});
    
        password.simulate('change', { target: { name: 'password', value: '12345678' }});
    
        button.simulate('click');
    
        expect(loginComponent.state().spinner).toBeTruthy();
    
        expect(loginComponent.find('Button').contains(<i className="fa fa-spinner fa-spin"/>)).toBeTruthy();
    });

    it('Do not show spinner if both or one field is empty when login button is pressed',()=>{
        let elements = loginComponent.find('.login');
        let user = loginComponent.find({ name:'user', type:'text'});
        let password = loginComponent.find({ name:'password', type:'password'});
        let button = loginComponent.find('Button');
    
        user.simulate('change', { target: { name: 'user', value: 'text' }});
    
        button.simulate('click');
    
        expect(loginComponent.state().spinner).toBeFalsy();
    
        expect(loginComponent.find('Button').contains(<i className="fa fa-spinner fa-spin"/>)).toBeFalsy();
    })
});