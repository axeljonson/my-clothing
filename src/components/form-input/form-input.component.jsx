
import './form-input.styles.scss';

/* 
  Pass the needed info as props.
  In general our <input> element looks like:
    <label>Display Name</label>
      <input 
        type="text"  
        required 
        onChange={handleChange} 
        name="displayName" 
        value={displayName} 
      />
  We will need to pass the 'label' as it is not part of the 'input' element.
  As long as we maintain, overlap, the element names on the passed in props
  we can use the spread operator to pass the props for the 'input' element.
  This allows us to pass any 'input' attributes based on the passed 'type'. 
*/

// The 'label' styling is dependent if we have anything in the value. If so,
// we want it to shrink and move up. Looking at the scss file, we see that
// the 'form-label' is looking for the "next" sibling with the class 'form-input-label'.
// So we will need to put the 'input' above the 'label' to make sure that the 
// label shrinks on focus. 
// Also, we only want to render the 'label' if one is provided.
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>
          {label}
        </label>
      )}
    </div>
  )
};

export default FormInput;
