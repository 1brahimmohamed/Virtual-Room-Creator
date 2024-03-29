import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeEvent, extend } from '@react-three/fiber';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import myFont from '../../../../assets/fonts/Roboto_Regular.json';

import { IAppStore } from '../../../../models/app-store.ts';
import { IRoomObject } from '../../../../models/room';
import { TAppDispatch } from '../../../../store/app-store';
import { storeRoomsSliceActions } from '../../../../store/slices/rooms/rooms-slice';
import RoomObjectUtil from '../../../../utilities/room-object';

extend({ TextGeometry });

const font = new FontLoader().parse(myFont);

const Texts = () => {
    const texts = useSelector((store: IAppStore) => store.rooms.selectedRoom?.state.texts);
    const dispatch = useDispatch<TAppDispatch>();

    const handleObjectSelection = (e: ThreeEvent<MouseEvent>, objectId: IRoomObject['id']) => {
        e.stopPropagation();
        dispatch(storeRoomsSliceActions.selectObject({ type: 'texts', id: objectId }));
    };

    return Object.values(texts || {}).map((textObj) => {
        const { id, rotation, color, text, scale, position } = textObj;

        return (
            <mesh
                key={id}
                onDoubleClick={(e) => handleObjectSelection(e, id)}
                rotation={RoomObjectUtil.convertRotationFromDegreeToEuler(rotation)}
                scale={scale}
                position={position}
                castShadow
                receiveShadow
            >
                <textGeometry args={[text, { font, size: 1, height: 0.3 }]} />
                <meshStandardMaterial color={color} />
            </mesh>
        );
    });
};

export default React.memo(Texts);
