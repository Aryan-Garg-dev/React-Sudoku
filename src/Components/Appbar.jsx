// import { FaStar } from "react-icons/fa"
import { sudokuLogo } from "../../public"
import { motion } from 'framer-motion'
// import { useRecoilValue } from "recoil"
// import { gameStateAtom } from "../atoms"

const Appbar = () => {
  // const game = useRecoilValue(gameStateAtom);
  return (
    <div className="border-b shadow-md rounded-lg flex justify-between">
      <div className='flex items-center gap-3 m-2 ml-4'> 
        <motion.img
          src={sudokuLogo}
          alt="Sudoku Logo"
          className="h-[50px] w-[50px]"
          animate={{
            x: [-100, 0],
            scale: [0, 1] 
          }}
          transition={{
            duration: 1, 
            // ease: "easeIn", 
            repeat: 0, 
            repeatType: "loop",
          }}
        />
        <motion.div
          className={`text-5xl font-zerovel select-none text-gray-900`}
          animate={{
            x: [-200, 0],
            scale: [0, 1]
          }}
          transition={{
            duration: 0.5,
            // ease: 'easeIn',
            initial: "hidden",
            animate: 'visible'
          }}
        >
          Sudoku
        </motion.div>
      </div>
      {/* <motion.div
        className="flex justify-center items-center mx-2 gap-2"
        animate={{
          scale: [0, 1]
        }}
        transition={{
          duration: 0.5,
          // ease: 'easeIn',
          initial: "hidden",
          animate: 'visible'
        }}
      >
        <div className="text-2xl font-bold font-playwrite text-yellow-700">{game.player.rating}</div>
        <div className="text-yellow-600 mb-1"><FaStar size={40} /></div>
      </motion.div> */}
    </div>
  )
}

export default Appbar
