import React from 'react'
import { shallow } from 'enzyme'
import { Feature } from './FeatureProvider'

describe('FeatureProvider', () => {
  it('should render child component if feature is enabled', () => {
    const component = shallow(
      <Feature name="test_feature">
        <div>Test</div>
      </Feature>
    )

    expect(component).toMatchSnapshot()
  })
})
