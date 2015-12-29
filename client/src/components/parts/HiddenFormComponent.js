'use strict';

import React from 'react';

class HiddenFormComponent extends React.Component {

    emulateClick() {
        this.refs.UploadInput.click();
    }

    getFile() {
        const { files } = this.refs.UploadInput;

        return files.length ? files[0] : null;
    }

    render() {

        const { handleImageChanged } = this.props;

        return (
            <form>
                <input onChange={handleImageChanged}
                       ref="UploadInput"
                       style={{position: 'absolute', left: '-10000px'}}
                       type="file"
                       accept="image/*"
                />
            </form>
        );
    }
};

HiddenFormComponent.displayName = 'PartsHiddenFormComponent';
HiddenFormComponent.propTypes = {
    handleImageChanged: React.PropTypes.func.isRequired
};

export default HiddenFormComponent;
