import React, { useEffect, useState } from "react";

/**
 *
 * this wraps a select element to customize the look and feel of the element
 * the list and options are children of the component and are passed in as props
 * it passes state throught the onChange event of the select element in the parent component
 *
 * @param props - the props for the component, should be a JSX.HTMLSelectElement with children
 *
 * @returns JSX.Element - a styled select list
 */
export default function SelectList(props: { children: JSX.Element }) {
  
  const [currentSelection, setCurrentSelection] = useState(
    props.children.props.value
  );

  useEffect(() => {
    const selectedOption = options.find((option: any) => option.selected);
    setCurrentSelection(selectedOption?.label);
  }, [props.children.props.value]);

  const selectList: JSX.Element = props.children;
  // get the value of the options in the select list
  const options = getOptions([...selectList.props.children]);

  function getOptions(options: any[]) {
    const optionValues = options.map((option: any) => {
      return {
        value: option.props.value,
        label: option.props.children,
        selected: option.props.selected,
      };
    });
    return optionValues;
  }

  function handleChange(e: any) {
    // set the current selection to the value of the option that matches the id
    const selectedOption = options.find(
      (option: any) => option.value === e.target.id
    );
    setCurrentSelection(selectedOption?.label);
    // change the value of the props.children to the id of the option by triggering the onChange event
    selectList.props.onChange(e);
    // hide the list of options
    toggleList();
  }

  // shows or hides the list of options
  function toggleList() {
    const id = selectList.props.id + "-list";
    const formatList = document.getElementById(id) as HTMLUListElement;
    formatList.style.display === "none"
      ? (formatList.style.display = "block")
      : (formatList.style.display = "none");
  }

  return (
    <>
      <div id='selectList' className='selectList' tabIndex={0} role="menu">
        <span className='select-element' onClick={toggleList}>
          {currentSelection}
        </span>
        <ul
          className='ul-clear select-container'
          id={selectList.props.id + "-list"}
        >
          {options.map((option: any) => {
            return (
              <li
                id={option.value}
                className='select-option no-wrap overflow-ellipsis x-no-scroll '
                key={option.value}
                onClick={handleChange}
                data-value={option.value}
                aria-selected={option.label === currentSelection}
                role="menuitem"
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
