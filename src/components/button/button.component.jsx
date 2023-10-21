
import './button.styles.scss';

/*
We have at least 3 different buttons
- default
- inverted
- Google sign in
We want to pass in an indicator as to the button to render so we can reuse the button. 
Let's create an object with keys we can pass into th component that will set the 
desired style. Now we can pass the 'buttonType' in the props.
*/

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

// In the component we can string interpolate the button type. Remember the JS code needs
// to be in {}. We also want to pass any other props.
const Button = ({ children, buttonType, otherProps }) => {
  return (
    <button 
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;
