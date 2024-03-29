import { useDispatch, useSelector } from 'react-redux';
import { twJoin } from 'tailwind-merge';

import SharingComponent from './SharingComponent/SharingComponent';
import CustomButton from '../../shared/Button';

import { IAppStore } from '../../../models/app-store';
import { storeRoomsSliceActions } from '../../../store/slices/rooms/rooms-slice';

const ShareRoom = () => {
    let isPublicLocal = useSelector((store: IAppStore) => store.rooms.selectedRoom?.isPublic);
    const roomID = useSelector((store: IAppStore) => store.rooms.selectedRoom?.id);

    const dispatch = useDispatch();

    const handleShareToggle = () => {
        dispatch(storeRoomsSliceActions.updateSelectedRoomInfo({ isPublic: !isPublicLocal }));
    };

    return (
        <div className="w-full overflow-auto">
            {isPublicLocal ? (
                <SharingComponent
                    sharingURL={`${document.location.origin}/shared-room/${roomID}`}
                    RenderQR={true}
                />
            ) : null}

            <div className="flex-col w-full">
                <CustomButton
                    className={twJoin(
                        'text-simulation-room-gradient-color from-simulation-room-gradient-from to-simulation-room-gradient-to',
                        'px-4 py-2.5 mt-0 text-base rounded-lg'
                    )}
                    onClick={handleShareToggle}
                >
                    {isPublicLocal ? 'Change room access to private' : 'Share Room'}
                </CustomButton>
            </div>
        </div>
    );
};

export default ShareRoom;
