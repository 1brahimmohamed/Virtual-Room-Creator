import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

import SidebarButtons from './SidebarButtons.tsx';
import ShareRoom from '../share-room/shareRoom.tsx';
import GLTFsAssets from '../room-assets/GLTFsAssets.tsx';
import SpecialEffects from '../special-effects/SpecialEffects.tsx';
import TextManager from '../text-management/TextManager.tsx';
import AddMesh from '../object-editor/AddMesh.tsx';
import HDRIsAssets from '../room-assets/HDRIsAssets.tsx';
import LightEditor from '../light-management/LightEditor.tsx';
import Collaborators from '../collaborators/Collaborators.tsx';

import { ESimulationRoomButtonId } from '../../../models/simulation-room-sidebar.ts';
import { storeRoomsSliceActions } from '../../../store/slices/rooms/rooms-slice.ts';

const Sidebar = () => {
    const [activeButtonId, setActiveButtonId] = useState<ESimulationRoomButtonId | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const renderFocus = () => {
        switch (activeButtonId) {
            case ESimulationRoomButtonId.TEXT_BTN:
                return <TextManager />;
            case ESimulationRoomButtonId.HDRIs_ASSETS_BTN:
                return <HDRIsAssets />;
            case ESimulationRoomButtonId.GLTFs_ASSETS_BTN:
                return <GLTFsAssets />;
            case ESimulationRoomButtonId.MESHES_BTN:
                return <AddMesh />;
            case ESimulationRoomButtonId.LIGHT_BTN:
                return <LightEditor />;
            case ESimulationRoomButtonId.SHARING_BTN:
                return <ShareRoom />;
            case ESimulationRoomButtonId.SPECIAL_EFFECT_BTN:
                return <SpecialEffects />;
            case ESimulationRoomButtonId.COLLABORATORS:
                return <Collaborators />;
            default:
                return null;
        }
    };

    const handleButtonClicking = (id: ESimulationRoomButtonId | null) => {
        if (id === ESimulationRoomButtonId.BACK_HOME_BTN) {
            dispatch(storeRoomsSliceActions.selectedRoom(null));
            navigate('/dashboard');
        } else {
            setActiveButtonId((activeId) => {
                return id !== activeId ? id : null;
            });
        }
    };

    return (
        <div
            className={`relative z-10 shrink-0 w-16 h-screen overflow-hidden transition-all duration-200 p-0`}
        >
            <div className="h-full w-full overflow-x-hidden overflow-y-auto bg-simulation-room-sidebar-bg">
                <SidebarButtons activeButtonId={activeButtonId} buttonClickHandler={handleButtonClicking} />
            </div>

            <div
                className={twJoin(
                    'fixed top-0 bottom-0 left-16 right-0 z-10',
                    'flex flex-col px-5 py-10 items-center transition-all duration-200',
                    'bg-simulation-room-sidebar-menu-bg text-simulation-room-sidebar-menu-color',
                    !activeButtonId ? 'w-0 opacity-0' : 'max-w-[350px] opacity-100'
                )}
            >
                {renderFocus()}
            </div>
        </div>
    );
};

export default Sidebar;
