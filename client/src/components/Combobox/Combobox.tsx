import { useState } from 'react'

interface ComboboxProps {
    labels: readonly string[],
    placeholder: string,
    selectedOption: any
    setSelectedOption: React.Dispatch<React.SetStateAction<any>>
}

const Combobox = ({
    labels= ['example1', 'example2'], 
    placeholder = 'placeholder..',
    selectedOption, 
    setSelectedOption,
}: ComboboxProps) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        setMenuIsOpen((current) => !current)
    }
    const selectLabel = (e: React.MouseEvent<HTMLLIElement>) => {
        setSelectedOption(e.currentTarget.innerText)
        setMenuIsOpen(false)
    }

  return (
    <div className='dropdown'>
        <div onClick={toggleMenu} className={menuIsOpen ? "select" : "select-clicked"}>
            <span className={selectedOption ? 'selected' : 'selected combobox-placegolder'}>{selectedOption ? selectedOption : placeholder}</span>
            <div className={menuIsOpen ? "caret" : "caret-rotate"}/>
            <ul className={menuIsOpen ? "dropdown-menu" : "dropdown-menu-open"}>
                {labels
                    .map(label => 
                    <li 
                        onClick={selectLabel} 
                        className={label === selectedOption ? 'dropdown-menu-item active' : 'dropdown-menu-item'}
                        key={label}
                        >
                        {label}
                    </li>)}
            </ul>
        </div>
    </div>
  )
}

export default Combobox