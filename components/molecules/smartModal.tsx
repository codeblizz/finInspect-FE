import React from 'react';
import { Dialog } from '@headlessui/react';
import Button from 'components/atomic/button';
import Paragraph from 'components/atomic/paragragh';

function SmartModal({
  isOpen,
  setOpen,
  modalTitle,
  description,
  className,
  okButtonAction,
  cancelButtonText,
  okButtonText,
}: any) {
  return (
    <Dialog
      as='div'
      open={isOpen}
      onClose={() => setOpen(false)}
      className={className}
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className='fixed inset-0 rounded-lg border-2 border-green-200 top-[40%] left-[35%] bottom-[35%] px-10 pb-7 text-center overflow-y-auto w-[35%] h-[32%] bg-green-900/50'>
        <Dialog.Panel className={'flex flex-col justify-center items-center'}>
          <Dialog.Title className={'text-center mt-6 text-2xl underline underline-offset-8'}>
            {modalTitle}
          </Dialog.Title>
          <Dialog.Description className={'my-8 text-white text-sm'}>
            {description}
          </Dialog.Description>
          <div className='flex justify-center items-center'>
            <Button
              name={cancelButtonText}
              autoFocus={false}
              disabled={false}
              type={''}
              value={''}
              className={'mr-5 border rounded-md px-3'}
              buttonText={cancelButtonText}
              onClick={() => setOpen(false)}
            />
            <Button
              autoFocus={false}
              name={okButtonText}
              disabled={false}
              type={''}
              value={''}
              className={'border rounded-md px-7'}
              buttonText={okButtonText}
              onClick={okButtonAction}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SmartModal;
