import { SyntheticEvent, useState } from "react";

export default function SelectList(props: { children: JSX.Element }) {
  const [currentSelection, setCurrentSelection] = useState(
    props.children.props.placeholder || "Select an option"
  );

  const selectElement: JSX.Element = props.children;
  const selectOptions = parseOptions([...selectElement.props.children]);

  const displayNone = { display: "none" };

  function parseOptions(options: JSX.Element[]) {
    return options.map((option) => {
      return {
        value: option.props.value,
        label: option.props.children,
      };
    });
  }

  function toggleList() {
    const id = selectElement.props.id + "-list";
    const list = document.getElementById(id) as HTMLElement;
    list?.style.display === "none"
      ? (list.style.display = "block")
      : (list.style.display = "none");
  }

  function handleChange(e: SyntheticEvent) {
    const target = e.target as HTMLLIElement;
    setCurrentSelection(target.textContent);
    selectElement.props.onChange(target.dataset.value);
    toggleList();
  }

  function handleKeyDown(e: SyntheticEvent<HTMLDivElement, KeyboardEvent>) {
    // determine if the list is showing or not
    const listState =
      document.getElementById(selectElement.props.id + "-list")?.style
        .display === "block";

    // determine the index of the current selection in the list
    const currentIndex = selectOptions.findIndex(
      (option) => option.label === currentSelection
    );

    // determine the index of the last item in the list
    const lastIndex = selectOptions.length - 1;
    const event = e.nativeEvent as KeyboardEvent;
    const key:string = event.key;

    switch (key) {
      case "ArrowDown":
      case "ArrowRight": {
        const nextIndex = currentIndex === lastIndex ? lastIndex : currentIndex + 1;
        setCurrentSelection(selectOptions[nextIndex].label);
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        const nextIndex = currentIndex === 0 ? 0 : currentIndex - 1;
        setCurrentSelection(selectOptions[nextIndex].label);
        break;
      }
      case "Enter": {
        // toggle the visibility of the list
        toggleList();
        break;
      }
      case "Escape": {
        // this only does something if the list is showing in which case it hides the list
        if (listState) {
          toggleList();
        }
        break;
      }
    }
  }

  return (
    <div
      id='selectList'
      className='selectlist'
      tabIndex={0}
      role='menu'
      onKeyDown={handleKeyDown}
    >
      <span className='select-element' onClick={toggleList}>
        {currentSelection}
      </span>
      <ul
        className='select-container'
        id={selectElement.props.id + "-list"}   
        style={displayNone}
      >
        {selectOptions.map((option) => (
          <li
            key={option.value}
            className='select-option'
            role='menuitem'
            onClick={handleChange}
            data-value={option.value}
            aria-selected={option.label === currentSelection}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
