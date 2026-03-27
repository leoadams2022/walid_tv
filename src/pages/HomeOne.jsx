import { useState } from "react";

import { useChannels } from "../contexts/ChannelContext";
import ChannelGrid from "../components/ChannelGrid";
import VideoPlayer from "../components/VideoPlayer";
import ThemeToggleButton from "../components/ThemeToggleButton";
import ControlButton from "../components/ControlButton";

import { LuTvMinimalPlay } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { VscDebugStepBack } from "react-icons/vsc";
import { LuHistory } from "react-icons/lu";
import { IoGrid } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import { FaDatabase } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function HomeOne() {
  const [openModal, setOpenModal] = useState(false);
  const {
    groupNames,
    selectedGroup,
    setSelectedGroup,
    searchQuery,
    setSearchQuery,
    currentChannel,
  } = useChannels();

  return (
    <div className="h-svh w-screen bg text ">
      {/* header */}
      <div className="h-8 w-full bg-pop px-2 sm:px-12 flex items-center justify-between">
        {/* left side  */}
        <div className="flex gap-2 items-center text-xs sm:text-xl ">
          {/* app name and logo  */}
          <div className="flex items-center gap-0.5 font-bold">
            <LuTvMinimalPlay className="size-4 sm:size-8" />
            {currentChannel?.name || "W-TV"}
          </div>
        </div>
        {/* right side  */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* contrlols */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* prev button  */}
            <ControlButton
              Icon={() => <GiNextButton className="size-6 rotate-180" />}
              tooltipContent="previous channel name"
            />
            {/* next button  */}
            <ControlButton
              Icon={() => <GiNextButton className="size-6" />}
              tooltipContent="next channel name"
            />
            {/* last channel button */}
            <ControlButton
              Icon={() => <VscDebugStepBack className="size-6" />}
              tooltipContent="last channel name"
            />
            {/* channels grid button  */}
            <ControlButton
              Icon={() => <IoGrid className="size-6" />}
              tooltipContent="channels grid"
              onClick={() => setOpenModal("channels")}
            />
            {/* history button  */}
            <ControlButton
              Icon={() => <LuHistory className="size-6" />}
              tooltipContent="history"
            />
            {/* sleep timer button  */}
            <ControlButton
              Icon={() => <GiNightSleep className="size-6" />}
              tooltipContent="sleep timer"
            />
          </div>
          {/* search button  */}
          <button className=" cursor-pointer">
            <FaSearch className="size-6" />
          </button>
          {/* theme toggle button */}
          <ThemeToggleButton />
          {/* import export button */}
          <button className=" cursor-pointer">
            <FaDatabase className="size-6" />
          </button>
        </div>
      </div>
      {/* main content  */}
      <div className="h-[calc(100svh-32px)] w-full flex items-center justify-center ">
        <VideoPlayer />
      </div>

      {/* the modal  */}
      <div
        className={`fixed ${
          openModal !== false ? "top-0" : "-top-full"
        } left-0 z-50 w-screen h-dvh bg-slate-900/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-in-out`}
        onClick={() => setOpenModal(false)}
      >
        {/* w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[95%] sm:h-[90%]  */}
        <div
          className="w-screen h-dvh bg rounded-2xl flex flex-col py-2 px-4 lg:px-10 xl:px-12 "
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="border-b py-2">
            {openModal === "channels" && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Search */}
                <div className="w-full sm:flex-1   sm:block  sm:max-w-sm">
                  <input
                    type="text"
                    placeholder="Search Channel"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-1 border outline rounded-sm h-6"
                  />
                  {/* Close Button */}
                  <button
                    className="cursor-pointer shrink-0 md:hidden size-6"
                    onClick={() => setOpenModal(false)}
                  >
                    <IoClose className="size-6" />
                  </button>
                </div>

                {/* Selected Group */}
                <div className="flex justify-start sm:justify-end">
                  <div className="cursor-pointer shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize bg-blue-600 text-white">
                    {selectedGroup}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  className="cursor-pointer shrink-0 hidden md:block"
                  onClick={() => setOpenModal(false)}
                >
                  <IoClose className="size-6" />
                </button>
              </div>
            )}
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto py-2">
            {/* {openModal === "channels" && <ChannelList />} */}
            {openModal === "channels" && <ChannelGrid />}
          </div>

          {/* FOOTER */}
          <div className="py-2 border-t">
            {openModal === "channels" && (
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 sm:gap-3 md:gap-4 min-w-max px-1">
                  {/* All */}
                  <div
                    className={`cursor-pointer shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                      selectedGroup === "all"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                    onClick={() => setSelectedGroup("all")}
                  >
                    All
                  </div>

                  {/* Favorites */}
                  <div
                    className={`cursor-pointer shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                      selectedGroup === "favorites"
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                    onClick={() => setSelectedGroup("favorites")}
                  >
                    Favorites
                  </div>

                  {/* Dynamic Groups */}
                  {groupNames.map((groupName) => (
                    <div
                      key={groupName}
                      className={`cursor-pointer shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-medium capitalize ${
                        selectedGroup === groupName
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      }`}
                      onClick={() => setSelectedGroup(groupName)}
                    >
                      {groupName}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeOne;

// function Mod() {
//   return (
//     <Modal
//       dismissible
//       show={openModal}
//       onClose={() => setOpenModal(false)}
//       size="7xl"
//     >
//       <ModalHeader>
//         {openModal === "channels" && (
//           <div className="flex items-center justify-between gap-6">
//             <TextInput
//               placeholder="Search Channel"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div
//               className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize bg-blue-600 text-white}`}
//             >
//               {selectedGroup}
//             </div>
//           </div>
//         )}
//       </ModalHeader>
//       <ModalBody>{openModal === "channels" && <ChannelGrid />}</ModalBody>
//       <ModalFooter>
//         {openModal === "channels" && (
//           <div className="overflow-x-auto pb-4 scrollbar-hide">
//             <div className="inline-flex gap-4 min-w-full">
//               <div
//                 className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize ${selectedGroup === "all" ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                 onClick={() => setSelectedGroup("all")}
//               >
//                 All
//               </div>
//               <div
//                 className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize ${selectedGroup === "favorites" ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                 onClick={() => setSelectedGroup("favorites")}
//               >
//                 Favorites
//               </div>
//               {groupNames.map((groupName) => (
//                 <div
//                   className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize  ${selectedGroup === groupName ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                   key={groupName}
//                   onClick={() => setSelectedGroup(groupName)}
//                 >
//                   {groupName}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </ModalFooter>
//     </Modal>
//   );
// }
// function ModT() {
//   return (
//     <div
//       className={`fixed  ${openModal !== false ? "top-0" : "-top-full"} left-0  z-50 w-screen h-svh bg-slate-900/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ease-in-out`}
//       onClick={() => setOpenModal(false)}
//     >
//       <div
//         className="w-[90%] h-[90%] bg rounded-2xl flex flex-col p-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* header */}
//         <div className="h-16 border-b py-2">
//           {openModal === "channels" && (
//             <div className="flex items-center justify-between gap-6 ">
//               <TextInput
//                 placeholder="Search Channel"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <div
//                 className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize bg-blue-600 text-white}`}
//               >
//                 {selectedGroup}
//               </div>
//             </div>
//           )}
//         </div>
//         {/* body  */}
//         <div className=" overflow-y-auto">
//           {/* {openModal === "channels" && <ChannelGrid />} */}
//           {openModal === "channels" && <ChannelList />}
//         </div>
//         {/* footer  */}
//         <div className="h-16 py-2 flex items-center justify-center border-t bg-amber-400">
//           {openModal === "channels" && (
//             <div className="overflow-x-auto scrollbar-hide">
//               <div className="inline-flex gap-4 min-w-full">
//                 <div
//                   className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize ${selectedGroup === "all" ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                   onClick={() => setSelectedGroup("all")}
//                 >
//                   All
//                 </div>
//                 <div
//                   className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize ${selectedGroup === "favorites" ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                   onClick={() => setSelectedGroup("favorites")}
//                 >
//                   Favorites
//                 </div>
//                 {groupNames.map((groupName) => (
//                   <div
//                     className={`cursor-pointer shrink-0 px-3 py-1 rounded-full  text-sm font-medium capitalize  ${selectedGroup === groupName ? "bg-blue-600 text-white " : " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
//                     key={groupName}
//                     onClick={() => setSelectedGroup(groupName)}
//                   >
//                     {groupName}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
