import Notes from '@/components/Notes'
import { shallowMount, createLocalVue ,mount } from '@vue/test-utils'
import { expect } from 'chai'
import Vuex from 'vuex'

const localVue = createLocalVue()

let mocknotes = [{
  'title': "dfsd",
  'title': "123df"
}];
let mockdata = [
  {
    'title': 'dfsdfsa',
    'author': 'ssddsf',
    'content': 'dsfaao',
    'time': 23,
    'process': 100,
    'id': '59f8f223'
  },
  {
    'title': 'dfsdasa',
    'author': 'admin332',
    'content': 'sxcvvxc',
    'time': 12,
    'process': 50,
    'id': '59f8f242'
  },
  {
    'title': 'dfsewr23',
    'author': 'admin332',
    'content': 'sxcdsavvxc',
    'time': 55,
    'process': 100,
    'id': '59f8f243'
  }
]

describe('Notes.vue', () => {
  let actions
  let store
  beforeEach(() => {
    actions = {
      fetchNotes: () => mockdata
    },
      store = new Vuex.Store({
        actions
      })
  })

  const wrapper = shallowMount(Notes, {
    mocks: {
      $http: (msg) => msg
    }
  })
  it('should render correctly', () => { })
  it("search should be ''", () => {
    expect(wrapper.vm.search)
      .to.equal("")
  })
  it("reg should be null", () => {
    expect(wrapper.vm.reg)
      .to.equal(null)
  })
  it("submitStatus should be null", () => {
    expect(wrapper.vm.$data.submitStatus)
      .to.equal('PENDING')
  })
  it("filteredNotes should be a function", () => {
    expect(wrapper.vm.filteredNotes).to.be.a('function')
  })
  it("mocknote should be filtred", () => {
    let result = [{
      'title': "123df"
    }]
    wrapper.vm.search = '123'
    expect(wrapper.vm.filteredNotes(mocknotes)).to.eql(result)
  })
  it("token should be null", () => {
    expect(wrapper.vm.token)
      .to.equal(null)
  })
  it("comlete_note should work", async() => {
    await expect(wrapper.vm.comlete_note())
      .to.equal(null)
  })
  it("delete_note should work", () => { 
    expect(wrapper.vm.delete_note())
      .to.equal(null)
  })
}) 