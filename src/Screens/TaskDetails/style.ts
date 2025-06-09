import {StyleSheet} from 'react-native';
import Fonts from '../../Theme/fonts';
import { Theme } from '../../theme/colors';

export const getStyles = (theme: Theme) => StyleSheet.create({
  header: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  rootView:{
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flexGrow: 1,
    padding: 32,
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
  },
  containerEdit:{
    justifyContent: 'center',
    gap: 16,
  },
  taskDetailsContainer: {
    backgroundColor: theme.secundaryBG,
    padding: 24,
    gap: 16,
    borderRadius: 12,
    width: 342,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    marginBottom: 32,
    overflow: 'visible',
    marginVertical: 8,
    marginHorizontal: 10,
    position: 'relative',
},
  title: {
    ...Fonts.Roboto60020,
    color: theme.secondaryText,
    marginBottom: 4,
  },
  titleTag: {
    ...Fonts.Roboto50018,
    color: theme.mainText,
  },
  description: {
    ...Fonts.Roboto40016,
    color: theme.mainText,
  },
  priority: {
    ...Fonts.Roboto40016,
    color: '#FFFFFF',
    backgroundColor: theme.secundaryAccent,
    padding: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    textTransform: 'uppercase',
  },
  carousel: {
    flexDirection: 'row',
    maxWidth: 190,
    flexWrap: 'wrap',
    gap: 4,
  },
  resolveButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: theme.primary,
    borderRadius: 8,
    borderWidth: 2,
    paddingVertical: 2,
  },
  resolveButtonText: {
    ...Fonts.Roboto40016,
    color: theme.primary,
    textTransform: 'uppercase',
  },
  reopenButton: {
    alignItems: 'center',
    backgroundColor: theme.erro,
    borderRadius: 8,
    paddingVertical: 2,
  },
  reopenButtonText: {
    ...Fonts.Roboto40016,
    color: theme.secundaryBG,
    textTransform: 'uppercase',
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: theme.primary,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 345,
  },
  addButtonText: {
    ...Fonts.Roboto40016,
    color: theme.secundaryBG,
    textTransform: 'uppercase',
  },
  addSubtaskInputContainer: {
    height: 70,
  },
  confirmButton: {
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 24.75,
    borderRadius: 8,
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  bottomSpace: {
    height: 50,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 24,
    top: 24,
    zIndex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  editButton: {
    width: 24,
    height: 24,
  },
  editButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24.75,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.primary,
  },
  cancelButtonText: {
    ...Fonts.Roboto60020,
    color: theme.primary,
    textTransform: 'uppercase',
  },
  confirmButtonText: {
    ...Fonts.Roboto60020,
    color: theme.secundaryBG,
    textTransform: 'uppercase',
  },
  confirmButtonCircle:{
    position: 'absolute',
    alignSelf:'flex-end',
    marginTop: 12,
    marginRight: 16
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.primaryLight,
    borderRadius: 8,
    padding: 4,
    gap: 4,
    marginRight: 4
  },
  tagText: {
    ...Fonts.Roboto40016,
    color: theme.mainText,
    textTransform: 'uppercase',
  },
  removeTagButton: {
    color: theme.erro,
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    paddingVertical: 4,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  priorityButtonActive: {
    backgroundColor: theme.secundaryAccent,
    borderColor: 'transparent',
  },
  priorityText: {
    color: theme.primary,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  priorityTextActive:{
    color: theme.secundaryBG,
  },
  zeroedBottomInput:{
    marginBottom: 0,
  },
  tagsInput:{
    marginBottom: 12,
  },
  tagsInputError:{
    marginBottom: 20,
  },
  descriptionInput:{
    marginBottom: 32,
  },
  tagsInputContainer: {
    height: 70,
    width: '100%',
  },
  noTag:{
    color: theme.secondaryText,
  },
  subtaskArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subtaskAreaText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginRight: 10,
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.background,
    paddingVertical: 4,
  },
  subtaskText: {
    ...Fonts.Roboto40016,
    color: theme.mainText,
    flexShrink: 1,
  },
  subtaskTextCompleted: {
    textDecorationLine: 'line-through',
    color: theme.secondaryText,
  },
  confirmEditButton:{
      padding: 8,
      position: 'absolute',
      height: 24,
      width: 24,
      right: 18,
      top: 15,
  },
  inputEditArea: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 40,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
});


export const getComponentStyles = (theme: Theme) => StyleSheet.create({
  deleteBox: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },
  trashIcon: {
    width: 25,
    height: 25,
    tintColor: theme.mainText,
  },
  rowFront: {
    backgroundColor: theme.secundaryBG,
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1, flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnRight: {
    backgroundColor: 'transparent',
    right: 0
  },
});
