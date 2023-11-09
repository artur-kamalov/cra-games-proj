import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
    children: React.ReactNode
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    containerClasses?: string,
    contentClasses?: string,
    closeOnClick?: boolean
}

const Modal = ({
    active, setActive, 
    children, 
    containerClasses, 
    contentClasses,
    closeOnClick = true
}: ModalProps) => {
  
    return (
        <AnimatePresence >
            {active && 
                <motion.div
                initial={{ opacity: 0,scale: 0,}}
                animate={{ opacity: 1,scale: 1,}}
                exit={{ opacity: 0,scale: 0 }}
                className={`modal ${containerClasses} `} onClick={() => {if(closeOnClick){setActive(false)}}}
                children={(
                    <motion.div
                    className={`modal-content ${contentClasses} `}
                    children={
                            children
                    }
                    />
                )}
            />}
        </AnimatePresence>
  )
}

export default Modal