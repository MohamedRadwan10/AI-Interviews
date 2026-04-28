"use client";

import React from "react";
import { Dialog } from "primereact/dialog";

const CommonModal = ({
  visible,
  onHide,
  header,
  children,
  footer,
  className = "",
  width = "50vw",
  closable = true,
  ...rest
}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: width }}
      onHide={onHide}
      footer={footer}
      className={`common-modal ${className}`}
      closable={closable}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      modal
      draggable={false}
      resizable={true}
      {...rest}
    >
      <div className="p-0 m-0">
        {children}
      </div>
    </Dialog>
  );
};

export default CommonModal;
