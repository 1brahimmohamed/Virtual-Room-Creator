import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { twJoin } from 'tailwind-merge';

import Input from '../../shared/Input';
import Button from '../../shared/Button';

import { TAppDispatch } from '../../../store/app-store';
import { addCollaboratorToSelectedRoomThunk } from '../../../store/slices/rooms/rooms-actions';

const AddCollaborator = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<TAppDispatch>();

    const handleAddingCollaborator = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = emailInputRef.current?.value;

        if (!email) {
            return;
        }

        dispatch(
            addCollaboratorToSelectedRoomThunk(email, () => {
                formRef.current?.reset();
            })
        );
    };

    return (
        <form ref={formRef} className="w-full" onSubmit={handleAddingCollaborator}>
            <Input
                ref={emailInputRef}
                type="text"
                id="email"
                className={twJoin(
                    'bg-simulation-room-sidebar-bg placeholder:text-simulation-room-sidebar-color text-simulation-room-sidebar-color',
                    'border border-simulation-room-bg',
                    'text-center outline-none'
                )}
                inputContainerProps={{ className: 'mt-0' }}
                placeholder="Enter an Email"
            />

            <Button
                className={twJoin(
                    'text-simulation-room-gradient-color from-simulation-room-gradient-from to-simulation-room-gradient-to',
                    'w-full max-w-full px-12 py-2.5 text-base rounded-lg'
                )}
            >
                Add Collaborator
            </Button>
        </form>
    );
};

export default AddCollaborator;
